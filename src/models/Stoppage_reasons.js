const { Model } = require('objection');

class Stoppage_reasons extends Model {
    static get tableName() {
        return 'stoppage_reasons';
    }

    static get idColumn() {
        return 'reason_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                reason_id: { type: 'integer' },
                subcat_id: { type: 'integer' },
                reason_name: { type: 'string' },
                status: { type: 'string' },
                createdAt: { type: 'timestamp' }
            }
        }
    }
}

module.exports = Stoppage_reasons;