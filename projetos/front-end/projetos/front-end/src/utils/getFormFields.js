// type = 'json' | 'form-data';
export default function getFormFields(formEvent, type = 'json') {
  const { target } = formEvent;
  const formData = new FormData(target);

  if (type === 'form-data') return formData;
  
  const entries = formData.entries();
  const formDataAsJson = Array.from(entries).reduce(
    (acc, [name, value]) => {
      acc[name] = value;

      return acc;
    },
    {},
  );

  return formDataAsJson;
}