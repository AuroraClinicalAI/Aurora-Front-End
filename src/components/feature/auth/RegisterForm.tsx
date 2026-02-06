import { useRegister } from "@/hooks";
import type { RegisterData } from "@/types/AuthType";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Field, FieldDescription, FieldError, FieldGroup, FieldLabel, Input } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkUsername } from "@/services/AuthService";
import { Check, X } from "lucide-react";

const registerSchema = z.object({
  nombre: z.string().min(3, "Nombre muy corto").trim(),
  correo: z.string().email("Correo no valido").min(1, "Correo requerido")
    .toLowerCase().trim(),
  nombreUsuario: z.string().min(3, "Nombre de usuario muy corto").trim(),
  clave: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[0-9]/, "Debe tener al menos un número")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe tener al menos un símbolo"),
  confirmarClave: z.string()
}).refine((data) => data.clave === data.confirmarClave, {
  message: "Las contraseñas no son iguales",
  path: ["confirmarClave"]
});
type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { loading, error, handleRegister } = useRegister();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: '',
      correo: '',
      nombreUsuario: '',
      clave: '',
      confirmarClave: '',
    },
    mode: "onBlur"
  });

  const [isUsernameVerified, setIsUsernameVerified] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'available' | 'taken' | null>(null);

  const handleVerifyUsername = async () => {
    const username = form.getValues('nombreUsuario');
    if (username.length < 3) return;

    setIsCheckingUsername(true);
    try {
      const { existe } = await checkUsername(username);
      if (existe) {
        setUsernameStatus('taken');
        setIsUsernameVerified(false);
      } else {
        setUsernameStatus('available');
        setIsUsernameVerified(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const usernameValue = form.watch('nombreUsuario');

  useEffect(() => {
    setIsUsernameVerified(false);
    setUsernameStatus(null);
  }, [usernameValue]);

  const onSubmit = async (values: RegisterFormValues) => {
    const data: RegisterData = {
      nombre: values.nombre,
      correo: values.correo,
      nombre_usuario: values.nombreUsuario,
      clave: values.clave,
      confirmar_clave: values.confirmarClave
    };
    const success = await handleRegister(data);
    if(success){
      navigate("/register-confirm");
    }
  };
  return (
    <Card className=" min-w-100 min-h-96 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center justify-between mx-auto">
      <CardHeader>
        <CardTitle className="justify-center text-black text-3xl font-bold mb-1 text-center">
          Registro de Usuario
        </CardTitle>
        <CardDescription className="justify-center text-slate-500 text-sm font-normal text-center">
          Ingresa tus datos para crear una cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form className="flex flex-col gap-5" id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) =>(
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nombre-form-field">
                    NOMBRE
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Cual es tu nombre?"
                    id="nombre-form-field"
                    aria-invalid={fieldState.invalid}
                    className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="correo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="correo-form-field">
                    CORREO ELECTRÓNICO
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="tu@ejemplo.com"
                    id="correo-form-field"
                    aria-invalid={fieldState.invalid}
                    className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="nombreUsuario"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nombre-usuario-form-field">
                    NOMBRE DE USUARIO
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Cual es tu nombre de usuario?"
                    id="nombre-usuario-form-field"
                    aria-invalid={fieldState.invalid}
                    className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    Este sera tu identificador único en el sistema.
                  </FieldDescription>
                </Field>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                size={"lg"}
                onClick={handleVerifyUsername}
                disabled={isCheckingUsername || form.getValues('nombreUsuario').length < 3}
                className={isUsernameVerified ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {isCheckingUsername ? "Verificando..." : "Verificar nombre de usuario"}
                {isUsernameVerified && <Check className="ml-2 h-4 w-4" />}
              </Button>
              {usernameStatus === 'taken' && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <X className="h-4 w-4" /> El nombre de usuario ya está en uso
                </p>
              )}
              {usernameStatus === 'available' && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="h-4 w-4" /> Nombre de usuario disponible
                </p>
              )}
            </div>
            <Controller
              name="clave"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="clave-form-field">
                    CONTRASEÑA
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="*******************"
                    type="password"
                    id="clave-form-field"
                    aria-invalid={fieldState.invalid}
                    className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmarClave"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmar-clave-form-field">
                    CONFIRMAR CONTRASEÑA
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="*******************"
                    type="password"
                    id="confirmar-clave-form-field"
                    aria-invalid={fieldState.invalid}
                    className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {/* Mostrar error del servidor si existe */}
                  {error && (
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {error}
                    </p>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="register-form"
          size={"lg"}
          disabled={loading || form.formState.isSubmitting || !isUsernameVerified}
        >
          {loading || form.formState.isSubmitting ? "Registrando..." : "Regístrate"}
        </Button>
      </CardFooter>
    </Card>
  );
}
