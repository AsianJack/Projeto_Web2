const Joi = require('joi');

class validacao {
    validaUsuario(usuario) {
        const schema = Joi.object({
            nome: Joi.string().required().messages({
                'any.required': 'O campo "nome" é obrigatório.'
            }),
            email: Joi.string().email().required().messages({
                'any.required': 'O campo "email" é obrigatório.',
                'string.email': 'O campo "email" deve ser um endereço de email válido.'
            }),
            senha: Joi.string().min(6).required().messages({
                'any.required': 'O campo "senha" é obrigatório.',
                'string.min': 'O campo "senha" deve conter no minimo 6 caracteres.'
            }),
            data_nascimento: Joi.string().required().messages({
                'any.required': 'O campo "data_nascimento" é obrigatório.'
            }),
            sexo: Joi.string().required().messages({
                'any.required': 'O campo "sexo" é obrigatório.'
            }),
            timestamp: Joi.date().timestamp().messages({
                'date.timestamp': 'O campo "timestamp" deve ser um timestamp válido.'
            })
        });

        return schema.validate(usuario);
    }

    validaPedido(pedido) {
        const schema = Joi.object({
            pastel: Joi.string().required().messages({
                'any.required': 'O campo "pastel" é obrigatório.'
            }),
            quantidade: Joi.number().min(1).required().messages({
                'any.required': 'O campo "quantidade" é obrigatório.',
                'number.min': 'O campo "quantidade" deve ser maior que 0.'
            }),
            preco: Joi.number().required().messages({
                'any.required': 'O campo "preco" é obrigatório.'
            }),
            clientId: Joi.string().required().messages({
                'any.required': 'O campo "clientId" é obrigatório.'
            }),
            timestamp: Joi.date().timestamp().messages({
                'date.timestamp': 'O campo "timestamp" deve ser um timestamp válido.'
            })
        });
        return schema.validate(pedido);
    }

    validaPastel(pastel) {
        const schema = Joi.object({
            nome: Joi.string().required().messages({
                'any.required': 'O campo "nome" é obrigatório.'
            }),
            preco: Joi.string().min(0.01).valid('Consulta', 'Tosa', 'Banho').required().messages({
                'any.required': 'O campo "preco" é obrigatório.',
                'any.only': 'O campo "preco" deve ser uma das opções: Consulta, Tosa, Banho.'
            }),
            descricao: Joi.string().required().messages({
                'any.required': 'O campo "descricao" é obrigatório.'
            }),
            timestamp: Joi.date().timestamp().messages({
                'date.timestamp': 'O campo "timestamp" deve ser um timestamp válido.'
            })
        });
        return schema.validate(pastel);
    }
}

module.exports = validacao;
