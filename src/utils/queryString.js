const getPaginationData = (query) => {
    let sort = {};
    if(query.sortBy){
        sort[query.sortBy] = query.order === 'desc' ? -1 : 1;
    }

    let limit = parseInt(query.limit) || 10;
    let page = parseInt(query.page) || 1;
    if (isNaN(limit) || limit <= 0) limit = 10;
    if (isNaN(page) || page <= 0) page = 1;
    let skip = (page - 1) * limit;

    return { sort, limit, page, skip };
}

export default getPaginationData;
