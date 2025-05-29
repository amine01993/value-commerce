
import { ChangeEvent, Dispatch, FormEvent, memo, SetStateAction, useCallback, useState } from "react";
import { Button, Field, Separator, Text } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { setPasswordLastUpdate } from "@/lib/slices/user";
import { useAppDispatch } from "@/lib/hooks";

interface PasswordFormType {
    setEditPassword: Dispatch<SetStateAction<boolean>>;
}

export default memo(function PasswordForm({ setEditPassword }: PasswordFormType) {

    const dispatch = useAppDispatch();
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleCurrentPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handlePasswordConfirmationChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(event.target.value);
    }, []);

    const cancelEditPassword = useCallback(() => {
        setEditPassword(false);
    }, []);

    const savePassword = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // validation
        const d = new Date();
        dispatch(setPasswordLastUpdate(d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear() + "-"));
        setEditPassword(false);
    }, []);

    return (
        <form onSubmit={savePassword}>
            <Text fontWeight="semibold">Edit your account password</Text>
            <Text>After making this change, use your new password to sign into your account.</Text>

            <Field.Root>
                <Field.Label fontSize="md">Current Password</Field.Label>
                <PasswordInput size="lg" placeholder="Enter Password" value={currentPassword} onChange={handleCurrentPasswordChange} />
            </Field.Root>

            <Separator />

            <Field.Root>
                <Field.Label fontSize="md">New Password</Field.Label>
                <PasswordInput size="lg" placeholder="Enter New Password" value={password} onChange={handlePasswordChange} />
            </Field.Root>

            <Field.Root>
                <Field.Label fontSize="md">Confirm New Password</Field.Label>
                <PasswordInput size="lg" placeholder="Enter Password Confirmation" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} />
            </Field.Root>

            <div className="actions">
                <Button variant="plain" colorPalette="orange" fontSize="md" fontWeight="semibold" size="lg" onClick={cancelEditPassword}>Cancel</Button>
                <Button variant="solid" colorPalette="orange" fontSize="md" fontWeight="semibold" size="lg" type="submit">Save</Button>
            </div>
        </form>
    );
});