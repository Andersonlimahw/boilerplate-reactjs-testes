import { PowerIcon, GearIcon, UsersThreeIcon, UsersIcon, ChatIcon  } from '@phosphor-icons/react';
import { ThemeSwitcher } from "../ThemeSwitcher";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


export function Footer() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            toast('Goodbye!', { type: 'info' }); 
            navigate('/');           
        } catch (error) {
            console.log(error);
            toast('Sorry! try again', { type: 'error' });
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    }

    return (
        <div data-testid="footer" className="w-1/3 fixed bg-zinc-900 w-full bottom-0 py-4 px-2 flex flex-col z-index-[99]">
            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <span className="cursor-pointer hover:scale-110 flex gap-4">
                    <PowerIcon data-testid='button_power' color="#ef4444" size={32} onClick={handleLogout} className="mr-5" /> 
                    <ThemeSwitcher 
                        data-testid='button_theme_switcher' 
                    />  
                    <ChatIcon size={32} onClick={() => handleNavigation('/chat')} />              
                    <GearIcon size={32} onClick={() => handleNavigation('/settings')} />              
                    <UsersThreeIcon size={32} onClick={() => handleNavigation('/groups')} />              
                    <UsersIcon size={32} onClick={() => handleNavigation('/community')} />              
                </span>
            </div>
        </div>
    )
}