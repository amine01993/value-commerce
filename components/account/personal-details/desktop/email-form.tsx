
import { ChangeEvent, Dispatch, FormEvent, memo, SetStateAction, useCallback, useState } from "react";
import { Button, Field, Input, Separator, Text } from "@chakra-ui/react";
import { setEmail as setCurrentEmail } from "@/lib/slices/user";
import { PasswordInput } from "@/components/ui/password-input";
import { useAppDispatch } from "@/lib/hooks";

interface EmailFormType {
    currentEmail: string;
    setEditEmail: Dispatch<SetStateAction<boolean>>;
}

export default memo(function EmailForm({ currentEmail, setEditEmail }: EmailFormType) {

    const dispatch = useAppDispatch();
    
    const [email, setEmail] = useState("");
    const [emailConfirmation, setEmailConfirmation] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    const handleEmailConfirmationChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmailConfirmation(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const cancelEditEmail = useCallback(() => {
        setEditEmail(false);
    }, []);

    const saveEmail = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // after validation
        dispatch(setCurrentEmail(email));
        setEditEmail(false);
    }, [email]);

    return (
        <form onSubmit={saveEmail}>
            <Text fontWeight="semibold" fontSize="sm">Current email</Text>
            <Text className="subtitle" fontSize="sm">{currentEmail}</Text>

            <Separator />

            <Text fontWeight="semibold" fontSize="sm">Edit your email address</Text>
            <Text className="subtitle" fontSize="sm">After making this change, use your new email to sign into your account.</Text>

            <Field.Root>
                <Field.Label>New Email</Field.Label>
                <Input placeholder="Enter New Email" value={email} onChange={handleEmailChange} />
            </Field.Root>

            <Field.Root>
                <Field.Label>Confirm New Email</Field.Label>
                <Input placeholder="Enter Email Confirmation" value={emailConfirmation} onChange={handleEmailConfirmationChange} />
            </Field.Root>

            <Field.Root>
                <Field.Label>Account Password</Field.Label>
                <PasswordInput placeholder="Enter Password" value={password} onChange={handlePasswordChange} />
                <Field.HelperText>For your security, please enter your password to verify this change.</Field.HelperText>
            </Field.Root>

            <div className="actions">
                <Button variant="ghost" colorPalette="orange" fontWeight="semibold" onClick={cancelEditEmail}>Cancel</Button>
                <Button variant="solid" colorPalette="orange" fontWeight="semibold" type="submit">Save</Button>
            </div>
        </form>
    );
})