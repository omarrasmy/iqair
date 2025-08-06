export async function createFindAllObject(entityFilterQuery,data,dbContext,count){
    let currentPage , nextPage,totalCount;
    if(entityFilterQuery.hasOwnProperty('skip')&& entityFilterQuery.hasOwnProperty('take')){
      currentPage=(entityFilterQuery['skip']/entityFilterQuery['take'])+1
      nextPage = currentPage+1;
    }
    else{
      currentPage=1
      nextPage=2
    }
    totalCount =(await dbContext.find({where:entityFilterQuery['where']})).length
    return {data,currentPage,nextPage,totalCount,count}
}