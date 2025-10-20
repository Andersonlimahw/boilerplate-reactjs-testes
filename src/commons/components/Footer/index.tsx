import { PowerIcon, GearIcon, UsersThreeIcon, UsersIcon  } from '@phosphor-icons/react';
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
        <div data-testid="footer" className="w-1/3 absolute bottom-10 flex flex-col">
            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <span className="cursor-pointer hover:scale-110 flex gap-4">
                    <PowerIcon data-testid='button_power' color="#ef4444" size={32} onClick={handleLogout} className="mr-5" /> 
                    <ThemeSwitcher 
                        data-testid='button_theme_switcher' 
                    />  
                    <GearIcon size={32} onClick={() => handleNavigation('/settings')} />              
                    <UsersThreeIcon size={32} onClick={() => handleNavigation('/groups')} />              
                    <UsersIcon size={32} onClick={() => handleNavigation('/comunity')} />              
                </span>
            </div>
        </div>
    )
}