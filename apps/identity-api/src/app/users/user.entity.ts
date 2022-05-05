import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserEntity {
  @Prop({ isRequired: true })
  id?: string;

  @Prop({ isRequired: true })
  username: string;

  @Prop({ isRequired: true })
  password?: string;

  constructor(id: string, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

export type UserEntityDocument = UserEntity & Document;
