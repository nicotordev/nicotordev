/**
 * Ejemplo de uso de Pino Logger en Server Component
 * Ubicación sugerida: src/app/dashboard/page.tsx
 */

import { log } from '@/lib/logger';

interface User {
  id: string;
  name: string;
  email: string;
}

async function getUsers(): Promise<User[]> {
  const functionLogger = log.child({ module: 'UserService', function: 'getUsers' });

  functionLogger.info('Fetching users from database');

  try {
    // Simular fetch de datos
    const users = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];

    functionLogger.debug({ userCount: users.length }, 'Users fetched successfully');

    return users;
  } catch (error) {
    functionLogger.error({ error }, 'Failed to fetch users');
    throw error;
  }
}

export default async function DashboardPage() {
  const pageLogger = log.child({ module: 'DashboardPage' });

  pageLogger.info('Rendering dashboard page');

  try {
    const users = await getUsers();

    pageLogger.debug(
      { userCount: users.length, firstUserId: users[0]?.id },
      'Page data loaded'
    );

    return (
      <div>
        <h1>Dashboard</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    pageLogger.error({ error }, 'Failed to render dashboard');

    return (
      <div>
        <h1>Error</h1>
        <p>Failed to load dashboard</p>
      </div>
    );
  }
}
