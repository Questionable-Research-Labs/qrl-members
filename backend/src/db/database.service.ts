import { Injectable } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Person } from '../people/models/person.model';
import { aql } from 'arangojs';
import { PersonArgs } from 'src/people/dto/person.args';
import { NewPersonInput } from 'src/people/dto/new-person.input';
import { first } from 'rxjs';

interface PersonDocument {
  _id: string;
  _key: string;
  _rev: string;
  first_name: string;
  last_name: string;
}

@Injectable()
export class DatabaseService {
  constructor(private dbConnection: ConnectionService) {}

  public async createPerson({
    firstName,
    lastName,
  }: NewPersonInput): Promise<Person> {
    let query = await this.dbConnection.db.query(aql`
      insert {
        first_name: ${firstName},
        last_name: ${lastName}
      } into people return NEW
    `);
    let person: PersonDocument = await query.next();
    return {
      id: person._key,
      firstName: person.first_name,
      lastName: person.last_name,
    };
  }

  public async getPeopleCollection(): Promise<Person[]> {
    return (
      await (
        await this.dbConnection.db.query(aql`
      for a in people
        return a
    `)
      ).all()
    ).map(({ _key, first_name: firstName, last_name: lastName }) => {
      return { id: _key, firstName, lastName };
    });
  }

  public async getPeopleById(id: string): Promise<Person> {
    let query = await this.dbConnection.db.query(aql`
      return document("people", ${id})
    `);
    let {
      _key,
      first_name: firstName,
      last_name: lastName,
    }: PersonDocument = await query.next();
    return {
      id: _key,
      firstName,
      lastName,
    };
  }

  public async removePeople(id: string): Promise<boolean> {
    let z = await this.dbConnection.db.query(aql`
      let doc = document("people", ${id})
      remove doc in people
      return doc
    `);
    return z.hasNext;
  }
}
