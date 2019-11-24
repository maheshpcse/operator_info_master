const { Model } = require('objection');

class Operator_info_master extends Model {
    static get tableName() {
        return 'operator_info_master';
    }

    static get idColumn() {
        return 'info_Id';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                info_Id: { type: 'integer' },
                userid: { type: 'string' },
                firstname: { type: 'string' },
                lastname: { type: 'string' },
                username: { type: 'string' },
                contact: { type: 'string' },
                role: { type: 'string' },
                status: { type: 'string' },
                createdAt: { type: 'timestamp' }
            }
        }
    }
}

module.exports = Operator_info_master;