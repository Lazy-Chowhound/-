import LoginPage from "@/components/LoginPage";
import CommandPage from "@/components/CommandPage";

const routes = [
    {
        path:'/',
        redirect:'/login',
    },
    {
        path:'/login',
        component:LoginPage,
    },
    {
        path:'/commandPage',
        component:CommandPage
    }
]

export default routes