/**
 * Ejemplo de uso de Pino Logger en Server Actions
 * Ubicación sugerida: src/app/actions/user-actions.ts
 */

'use server';

import { log } from '@/lib/logger';

interface FormData {
  name: string;
  email: string;
}

export async function createUser(formData: FormData) {
  const actionLogger = log.child({
    module: 'UserActions',
    action: 'createUser',
  });

  actionLogger.info({ email: formData.email }, 'Creating new user');

  try {
    // Validación
    if (!formData.email || !formData.name) {
      actionLogger.warn({ formData }, 'Validation failed');
      return {
        success: false,
        error: 'Name and email are required',
      };
    }

    actionLogger.debug({ email: formData.email }, 'Validation passed');

    // Simular guardado en BD
    const userId = Math.random().toString(36).substr(2, 9);

    actionLogger.info(
      { userId, email: formData.email },
      'User created successfully'
    );

    return {
      success: true,
      userId,
    };
  } catch (error) {
    actionLogger.error({ email: formData.email, error }, 'Failed to create user');

    return {
      success: false,
      error: 'Internal server error',
    };
  }
}

export async function updateUser(userId: string, data: Partial<FormData>) {
  const actionLogger = log.child({
    module: 'UserActions',
    action: 'updateUser',
    userId,
  });

  actionLogger.info({ updatedFields: Object.keys(data) }, 'Updating user');

  try {
    // Simular actualización
    actionLogger.debug({ userId, data }, 'User data updated');

    actionLogger.info('User updated successfully');

    return { success: true };
  } catch (error) {
    actionLogger.error({ error }, 'Failed to update user');
    return { success: false, error: 'Update failed' };
  }
}

export async function deleteUser(userId: string) {
  const actionLogger = log.child({
    module: 'UserActions',
    action: 'deleteUser',
    userId,
  });

  actionLogger.warn('User deletion requested');

  try {
    // Simular eliminación
    actionLogger.info('User deleted successfully');

    return { success: true };
  } catch (error) {
    actionLogger.error({ error }, 'Failed to delete user');
    return { success: false, error: 'Deletion failed' };
  }
}
