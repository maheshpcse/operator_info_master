const { Model } = require('objection');

class Stoppage_categories extends Model {
    static get tableName() {
        return 'stoppage_categories';
    }

    static get idColumn() {
        return 'cat_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                cat_id: { type: 'integer' },
                category_name: { type: 'string' },
                status: { type: 'string' },
                createdAt: { type: 'timestamp' }
            }
        }
    }
}

module.exports = Stoppage_categories;