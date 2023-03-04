import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Controller, useForm } from 'react-hook-form'
// import Select from 'react-select'
import { Select } from "chakra-react-select";

function HookForm() {
    const { control, handleSubmit, register } = useForm()

    return (<Container width={300} p={10}>
        <form
            onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name='food'
                rules={{ required: "Please enter at least one food group." }}
                render = {
                    ({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { error }
                      }) => (
                        <FormControl py={4} isInvalid={!!error} id="food">
                          <FormLabel>Food Groups</FormLabel>
                          <Select size='sm'
                            // isMulti
                            name={name}
                            ref={ref}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            options={foodGroups}
                            placeholder="Food Groups"
                            closeMenuOnSelect={false}
                          />
              
                          <FormErrorMessage>{error && error.message}</FormErrorMessage>
                        </FormControl>
                      )
                }
            />
            <Button mt={10} type='submit'>Submit</Button>
        </form>
    </Container>)

    function onSubmit(val: any) {
        alert(JSON.stringify(val))
    }
}

export { HookForm }

const foodGroups = [
    {
      label: "Fruits",
      value: "fruit"
    },
    {
      label: "Vegetables",
      value: "vegetable"
    },
    {
      label: "Grains",
      value: "grain"
    },
    {
      label: "Protein Foods",
      value: "protein"
    },
    {
      label: "Dairy",
      value: "dairy"
    }
  ]

  const defaultValues = { food: [] }