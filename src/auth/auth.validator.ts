import { body } from 'express-validator';
export default {
    validate: (method: string): any[] | undefined => {
        switch (method) {
            case 'login': {
                return [
                    body('username', 'username not provided').exists().notEmpty(),
                    body('password', 'password not provided').exists().notEmpty(),
                ]
            }
        }
    }
}