import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as tenantsOrmconfig from '../tenants-orm.config';
import * as ormconfig from '../orm.config';

export function getTenantConnection(tenantName: string): Promise<Connection> {
  const connectionName = `tenant_${tenantName}`;

  const connectionManager = getConnectionManager();

  if (connectionManager.has(connectionName)) {
    const connection = connectionManager.get(connectionName);

    return Promise.resolve(
      connection.isConnected ? connection : connection.connect(),
    );
  }

  return createConnection({
    ...(tenantsOrmconfig as PostgresConnectionOptions),
    name: connectionName,
    schema: connectionName,
  });
}
