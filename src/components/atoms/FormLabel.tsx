import { Field } from "@chakra-ui/react";

type FieldLabelProps = React.ComponentProps<typeof Field.Label>;

const FormLabel = (props: FieldLabelProps) => (
  <Field.Label
    fontSize="md"
    fontFamily="heading"
    fontWeight="600"
    color="neutral.100"
    {...props}
  />
);

export default FormLabel;
