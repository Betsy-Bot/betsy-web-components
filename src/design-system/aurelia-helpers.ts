import {
    Constructable,
    Controller,
    CustomElement,
    IAurelia,
    IContainer,
    Resolved,
} from 'aurelia';
import {
    CustomElementDefinition,
    ICustomElementController,
} from '@aurelia/runtime-html';

export function createCustomElement<T extends Constructable = Constructable>(
    component: T,
    container: IContainer,
    host?: HTMLElement,
    values?: unknown
): {
    instance: Resolved<T>;
    controller: ICustomElementController<Resolved<T>>;
    definition: CustomElementDefinition<T>;
} {
    const instance = container.get(component);
    Object.assign(instance, values);
    const definition = CustomElement.getDefinition(component);
    const controller = Controller.$el(
        container,
        instance,
        host ?? container.get(IAurelia).root.host,
        null,
        definition as unknown as CustomElementDefinition
    );
    void controller.activate(controller, null, controller.scope);
    return { instance, controller, definition };
}

export const destroyCustomElement = async (
    controller: ICustomElementController
): Promise<void> => {
    await controller.activate(controller, null, null);
    controller.dispose();
};
