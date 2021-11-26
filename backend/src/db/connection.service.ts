import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbConfig } from './db.config';
import { Database, aql } from 'arangojs';
import { Logger } from '@nestjs/common';
import { ShutdownService } from 'src/control/shutdown.service';

@Injectable()
export class ConnectionService implements OnModuleInit, OnModuleDestroy {
  public db: Database;

  constructor(
    private configService: ConfigService,
    private shutdownService: ShutdownService,
  ) {}

  async onModuleInit(): Promise<void> {
    const { port, username, password, address } =
      this.configService.get<DbConfig>('database');

    const connectionURL = 'http://' + address + ':' + port;
    Logger.log('Connecting to: ' + connectionURL, 'DB');

    try {
      this.db = new Database({
        url: connectionURL,
        databaseName: '_system',
        auth: {
          username,
          password,
        },
      });
    } catch (ex) {
      Logger.error('Error logging into database', ex);
    }

    try {
      const people_graph = await this.db.collection('people');
      if (!(await people_graph.exists())) {
        await this.db.createCollection('people');
      }
    } catch (ex) {
      Logger.error(ex);
      this.shutdownService.shutdown();
    }
  }

  onModuleDestroy() {
    this.db.close();
  }
}
