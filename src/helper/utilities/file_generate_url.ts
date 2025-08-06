// import { GetSignedUrlConfig } from "@google-cloud/storage";
// import { join } from "path";
// import { GenerateFileUrlRequest } from 'src/files/dto/generate-file-request.dto';
// import { StorageProvider } from "src/files/storage.provider";

// export async function GenerateFileUrl(GenerateFileUrlRequest: GenerateFileUrlRequest) {
//   let store = StorageProvider.getStorageInstance();
//   let bucket = store.bucket('ems-new')
//   let options = {
//     version: 'v4',
//     action: GenerateFileUrlRequest.access,
//     expires: GenerateFileUrlRequest.expires,
//   } as GetSignedUrlConfig;
//   if (GenerateFileUrlRequest.access != 'read') {
//     options.contentType = GenerateFileUrlRequest.mimetype;
//     GenerateFileUrlRequest.name = Date.now().toString() + GenerateFileUrlRequest.name;
//   }
//   // await bucket.setCorsConfiguration([
//   //   {
//   //     origin: ['*'],
//   //     method: ['GET','PUT'],
//   //     responseHeader: ['Content-Type'],
//   //     maxAgeSeconds: 60,
//   //   }
//   // ])
//   const [url] = await
//     bucket.file(GenerateFileUrlRequest.destination + '/' + GenerateFileUrlRequest.name)
//       .getSignedUrl(options);
//   return url
// }