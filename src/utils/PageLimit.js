function getLimitAndPage(limit, page) {
    limit = !limit ? 15 : Number(limit)
    page = !page ? 0 : Number((page - 1) * limit)
    return { limit, page }
}

module.exports = getLimitAndPage