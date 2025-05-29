
import { ChangeEvent, Dispatch, FormEvent, memo, SetStateAction, useCallback, useState } from "react";
import { Button, Field, Input, Text } from "@chakra-ui/react";
import { setFirstName as setFN, setLastName as setLN } from "@/lib/slices/user";
import { useAppDispatch } from "@/lib/hooks";

interface NameFormType {
    firstN: string;
    lastN: string;
    setEditName: Dispatch<SetStateAction<boolean>>;
}

export default memo(function NameForm({ firstN, lastN, setEditName }: NameFormType) {

    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState(firstN);
    const [lastName, setLastName] = useState(lastN);

    const handleFirstNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }, []);

    const handleLastNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }, []);

    const cancelEditName = useCallback(() => {
        setEditName(false);
    }, []);

    const saveName = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setFN(firstName));
        dispatch(setLN(lastName));
        setEditName(false);
    }, [firstName, lastName]);

    return (
        <form onSubmit={saveName}>
            <Text fontWeight="semibold" fontSize="sm">Edit your name</Text>

            <Field.Root>
                <Field.Label>First Name</Field.Label>
                <Input placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
            </Field.Root>

            <Field.Root>
                <Field.Label>Last Name</Field.Label>
                <Input placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
            </Field.Root>

            <div className="actions">
                <Button variant="ghost" colorPalette="orange" fontWeight="semibold" onClick={cancelEditName}>Cancel</Button>
                <Button variant="solid" colorPalette="orange" fontWeight="semibold" type="submit">Save</Button>
            </div>
        </form>
    );
});