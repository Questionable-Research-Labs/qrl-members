import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super(
            (() => {
                const { issuer, audience } = configService.get<Auth0>('auth0');
                return {
                    secretOrKeyProvider: passportJwtSecret({
                        cache: true,
                        rateLimit: true,
                        jwksRequestsPerMinute: 5,
                        jwksUri: `${issuer}.well-known/jwks.json`,
                    }),

                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    audience: issuer,
                    issuer: audience,
                    algorithms: ['RS256'],
                };
            })(),
        );
    }

    validate(payload: unknown): unknown {
        return payload;
    }
}
