import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { ROLES } from "@/constant/roles"
import { useLoginMutation } from "@/store/api/auth-api"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function LoginPage() {
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const loginData = {
      email: values.email,
      password: values.password,
    }
    // console.log("LOGIN DATA: ", loginData)
    try {
      const resultLogin = await login(loginData).unwrap()
      Swal.fire({
        icon: "success",
        title: "Sukses Login!",
        text: "Selamat, Anda berhasil login!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // console.log("RESULT LOGIN: ", resultLogin)
        // remake this part to switch case
        switch (resultLogin.role) {
          case ROLES.ADMIN:
            return navigate("/admin", { replace: true })
          case ROLES.TEACHER:
            return navigate("/teacher", { replace: true })
          case ROLES.PARENT:
            return navigate("/parent", { replace: true })
          default:
            return navigate("/", { replace: true })
        }
      })
    } catch (error) {
      // console.log("ERROR LOGIN DATA: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Login!",
        text: error?.data?.message ?? "Maaf Anda gagal login!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <div className="bg-color-1 w-screen h-screen flex px-5 lg:px-0 justify-center items-center">
      <div className="bg-white rounded-[20px] overflow-hidden max-w-[800px] max-h-[400px] h-full  w-full grid lg:grid-cols-2 ">
        <div className="bg-color-8 hidden lg:flex justify-center items-center">
          <img
            src="/images/login.png"
            alt="login-image"
            className="flex-shrink-0   w-[230px] h-[230px] "
          />
        </div>
        <div className=" flex justify-center items-center font-roboto">
          <div className="px-2  w-[360px] space-y-2">
            <h1 className="uppercase text-fs20_30 font-bold text-color-1 text-center">
              PRESENSI SISWA
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="overflow-auto px-1 w-full  space-y-6 text-start">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Masukan email guru"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Masukan Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoadingLogin}
                  type="submit"
                  className="bg-color-1 w-full hover:bg-color-1/60 gap-x-2 flex items-center text-white">
                  {isLoadingLogin && (
                    <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
                  )}
                  Masuk
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
