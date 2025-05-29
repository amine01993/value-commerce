
import { ChangeEvent, Dispatch, FormEvent, memo, SetStateAction, useCallback, useRef, useState } from "react";
import { withMask } from "use-mask-input";
import { Button, Field, Input, Text } from "@chakra-ui/react";
import { setPhone } from "@/lib/slices/user";
import { useAppDispatch } from "@/lib/hooks";

interface PhoneFormType {
    phone: string;
    setEditPhone: Dispatch<SetStateAction<boolean>>;
}

export default memo(function PhoneForm({ phone, setEditPhone }: PhoneFormType) {

    const phoneMask = useRef(withMask("(999) 999-9999"));
    const dispatch = useAppDispatch();

    const [phoneNumber, setPhoneNumber] = useState(phone);

    const handlePhoneChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    }, []);

    const cancelEditPhone = useCallback(() => {
        setEditPhone(false);
    }, []);

    const savePhone = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setPhone(phoneNumber));
        setEditPhone(false);
    }, [phoneNumber]);

    return (
        <form onSubmit={savePhone}>
            <Text fontWeight="semibold" fontSize="sm">Edit your phone number</Text>

            <Field.Root>
                <Field.Label>Mobile</Field.Label>
                <Input placeholder="(999) 999-9999" ref={phoneMask.current} value={phoneNumber} onChange={handlePhoneChange} />
            </Field.Root>

            <div className="actions">
                <Button variant="ghost" colorPalette="orange" fontWeight="semibold" onClick={cancelEditPhone}>Cancel</Button>
                <Button variant="solid" colorPalette="orange" fontWeight="semibold" type="submit">Save</Button>
            </div>
        </form>
    );
});