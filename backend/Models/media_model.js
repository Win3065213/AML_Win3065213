const pool = require("../database");

// exports.getTypeID = async (types) => {
//     const typeSQL = 'SELECT * FROM type WHERE mediaType IN (?)';
//     console.log(types)
//     const [typeIDs] = await pool.execute(typeSQL, [types]);
//     return typeIDs;
// }

exports.getMedia = async (value, isAdvanced, searchBy,mediaTypes) => {
    // media database query based on receiving values
    let query = `SELECT 
        m.mediaID,
        m.mediaName,
        m.creator,
        m.publisher,
        m.year,
        type.mediaType
        FROM media m JOIN type ON m.typeID = type.typeID WHERE `;
    const params = [];

    if (!isAdvanced) {
        // console.log("Simple Search");
        query += '(mediaName LIKE ? OR creator LIKE ? OR publisher LIKE ?)';
        params.push(`%${value}%`, `%${value}%`, `%${value}%`);
        // console.log("Params check: ", params);
    } else {
        // console.log("Advanced Search");

        // Search By
        if (searchBy === "all") {
            // console.log("all");
            query += '(m.mediaName LIKE ? OR m.creator LIKE ? OR m.publisher LIKE ?)';
            params.push(`%${value}%`, `%${value}%`, `%${value}%`);
            // console.log("Params check: ", params);
        } else {
            // console.log("Search By: ", searchBy)
            query += `${searchBy} LIKE ?`;
            params.push(`%${value}%`);
        }

        // media types 
        if (!mediaTypes.all) {
            const selectedTypes = Object.entries(mediaTypes)
                .filter(([key, value]) => key !== 'all' && value)
                .map(([key]) => key)
            if (selectedTypes.length > 0) {
                const placeholders = selectedTypes.map(() => '?').join(', ');
                query += ` AND type.mediaType IN (${placeholders})`
                params.push(...selectedTypes);
            }
        }
    }

    // console.log("Query Check: ", query);
    // console.log("Params check: ", params);
    const [mediaList] = await pool.execute(query, params);
    // console.log(mediaList);
    return mediaList;
}