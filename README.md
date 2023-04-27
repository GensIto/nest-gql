# Nest GraphQL

### PrismaClient の定義がありません、みたいなことを言われて import できない

[docs](https://www.prisma.io/docs/concepts/components/prisma-client#2-installation)

```
npx prisma generate
```

`yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql`

app.module.ts

```
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

```

# validator

`yarn add class-validator class-transformer`
main.ts に追加
`app.useGlobalPipes(new ValidationPipe());`

dto でも input でもいい

# Prisma

`npm i prisma --save-dev`
`npx prisma init`
`npx prisma migrate dev --name "任意"`
`npx prisma studio`
`npm i @prisma/client`

<details>
<summary>nest g mo prisma</summary>

```
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

```

</details>

<details>
<summary>nest g s prisma --no-spec</summary>
都度公式確認

```
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
async onModuleInit() {
await this.$connect();
}

async enableShutdownHooks(app: INestApplication) {
this.$on('beforeExit', async () => {
await app.close();
});
}
}

```

</details>
```

### 認証 setup

`nest g resource`
`yarn add @nestjs/passport passport passport-local`
`yarn add --dev @types/passport-local`
`yarn add @nestjs/jwt passport-jwt`
`yarn add --dev @types/passport-jwt`

.env
`JWT_SECRET='jwt@key'` など

認証に UserService が必要なので export する

```
@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

```

AuthModule に必要なものを import する

```

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), //デフォルトの認証方法
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // secret部分
      signOptions: { expiresIn: '1h' }, // 1時間
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}

```

strategies は事前に走る処理
