export function SanitizeInput(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const data = args[0];

    if (data?.noteTitle) data.noteTitle = data.noteTitle.trim();
    if (data?.noteContent) data.noteContent = data.noteContent.trim();

    return original.apply(this, args);
  };
}

export function ValidateNotEmpty(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const data = args[0];

    if (!data?.noteTitle || !data?.noteContent) {
      throw new Error('Note cannot be empty');
    }

    return original.apply(this, args);
  };
}

export function AutoUpdateTimestamp(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result = original.apply(this, args);
    if (result) {
      result.updatedAt = new Date().toISOString();
    }
    return result;
  };
}