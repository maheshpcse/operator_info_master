const { Model } = require('objection');

class Stoppage_subcategories extends Model {
    static get tableName() {
        return 'stoppage_subcategories';
    }

    static get idColumn() {
        return 'subcat_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                subcat_id: { type: 'integer' },
                cat_id: { type: 'integer' },
                subcategory_name: { type: 'string' },
                status: { type: 'string' },
                createdAt: { type: 'timestamp' }
            }
        }
    }
}

module.exports = Stoppage_subcategories;