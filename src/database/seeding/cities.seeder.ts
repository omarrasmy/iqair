import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Cities } from 'src/cities/db/city.entity';
import { requests } from 'src/helper/utilities/requests';
import { RequestsWithoutBodyEnum } from 'src/helper/enums/requests.enum';

export default class CitiesSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const cityRepo = dataSource.getRepository(Cities);
        const limit = 10; // Free plan max per request
        let offset = 0;
        let page = 1;
        let hasMore = true;

        console.log('🌍 Seeding French cities...');

        while (hasMore && page <= 50) { // Avoid infinite loop
            const response = await requests(
                `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=Paris&countryIds=FR&limit=${limit}&offset=${offset}`,
                undefined,
                {
                    headers: {
                        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                    },
                },
                RequestsWithoutBodyEnum.GET,
            );
            console.log(`Page ${page}:`);

            const cities = response.data ?? [];

            if (cities.length === 0) {
                hasMore = false;
                break;
            }

            for (const city of cities) {
                const exists = await cityRepo.findOne({ where: { name: city.name }, select: { name: true } });
                if (exists) continue;

                try {
                    await dataSource
                        .createQueryBuilder()
                        .insert()
                        .into(Cities)
                        .values({
                            name: city.name, // or any dynamic name
                            // skip location here; we’ll override it in .setParameter
                            location: () => 'ST_GeomFromText(:point, 4326)', // Use WGS 84 SRID
                        })
                        .setParameter('point', `POINT(${city.longitude} ${city.latitude})`)
                        .execute();
                } catch (error) {
                    console.error(`Error saving city ${city.name}:`, error);
                }
            }
            await sleep(1500); // 🕒 Wait 1 second

            offset += limit;
            page++;
        }

        console.log('✅ Done seeding cities.');
    }

}
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
