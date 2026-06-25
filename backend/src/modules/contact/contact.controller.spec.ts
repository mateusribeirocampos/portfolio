import { RequestMethod } from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { ContactController } from './contact.controller';

const contactServiceMock = {
  createContact: jest.fn(),
};

function getControllerRoutes() {
  return Object.getOwnPropertyNames(ContactController.prototype)
    .filter((propertyName) => propertyName !== 'constructor')
    .map((propertyName) => {
      const handler = ContactController.prototype[
        propertyName as keyof ContactController
      ] as (...args: unknown[]) => unknown;

      return {
        propertyName,
        path: Reflect.getMetadata(PATH_METADATA, handler),
        method: Reflect.getMetadata(METHOD_METADATA, handler),
      };
    })
    .filter((route) => route.method !== undefined);
}

describe('ContactController routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('keeps public contact submission available', async () => {
    contactServiceMock.createContact.mockResolvedValue({
      message: 'Contato enviado com sucesso!',
      id: 'contact-1',
    });
    const controller = new ContactController(contactServiceMock as never);
    const dto = {
      name: 'Mateus Campos',
      email: 'mateus@example.com',
      message: 'Mensagem de teste com tamanho suficiente.',
    };

    await expect(
      controller.createContact(dto, '127.0.0.1', 'test-agent'),
    ).resolves.toEqual({
      message: 'Contato enviado com sucesso!',
      id: 'contact-1',
    });
    expect(contactServiceMock.createContact).toHaveBeenCalledWith(
      dto,
      '127.0.0.1',
      'test-agent',
    );
  });

  it('declares no public contact listing or status-update routes', () => {
    expect(getControllerRoutes()).toEqual([
      {
        propertyName: 'createContact',
        path: '/',
        method: RequestMethod.POST,
      },
    ]);
  });
});
