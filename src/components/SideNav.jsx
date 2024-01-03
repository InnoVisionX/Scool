import { useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import { useSchoolData, useLogin } from '@/hooks';
import { menus, PATHS } from '@/constants';
import { AvatarSkeleton, TextSkeleton } from '@/components/Skeleton';

const SideNav = ({ active }) => {
    const [activeMenu, setActiveMenu] = useState(active)
    const navigate = useNavigate()
    const location = useLocation();

    useLayoutEffect(() => {
        if (PATHS[location.pathname]) {
            setActiveMenu(PATHS[location.pathname])
        } else {
            setActiveMenu(0)
        }
    }, [location])

    const { schoolData, isLoading } = useSchoolData()
    const { logout } = useLogin()

    return (
        <div className='bg-white rounded-xl text-sm shadow-sm h-[80vh] w-[15rem] p-6 py-8 flex flex-col items-center gap-16 fixed top-[108px] left-0 ml-[2rem] border'>
            {isLoading && <SideNavSkeleton />}

            {!isLoading && !schoolData && <SideNavSkeleton />}

            {!isLoading && schoolData &&
                <div className='flex flex-col items-center'>
                    <img src={schoolData.logo} className='w-16 rounded-full' alt={schoolData.name} />

                    <p className='pt-2 text-sm text-gray-500'>Super Admin</p>

                    <p className='font-semibold text-accent_primary'>{schoolData.name}</p>
                </div>
            }

            <div className='flex flex-col items-start w-full gap-6'>
                {menus.map((menu, index) => (
                    <button
                        key={menu.url}
                        onClick={() => {
                            setActiveMenu(index)
                            navigate(menu.url)
                        }}
                        className={
                            clsx('flex w-full items-center gap-2 p-2 rounded-md',
                                index == activeMenu ? 'cursor-pointer font-bold bg-accent_primary text-accent_secondary transition-all ease-in-out' : "hover:bg-neutral_white"
                            )
                        }
                    >
                        {index == activeMenu ? <menu.solidIcon className='w-5 text-accent_secondary' /> : <menu.icon className='w-5 text-accent_primary' />}

                        <p className={clsx(index == activeMenu ? "text-accent_secondary" : "text-accent_primary")}>{menu.name}</p>
                    </button>
                ))}
            </div>

            <button onClick={logout} className='absolute flex items-center gap-4 p-2 pr-10 font-semibold text-white underline rounded-md cursor-pointer left-6 bottom-10 bg-error hover:bg-error/90'>
                <LogOut className='w-5' />

                <p>Logout</p>
            </button>
        </div>
    )
}

export default SideNav


const SideNavSkeleton = () => {
    return (
        <div className='flex flex-col items-center gap-3.5 mb-1'>
            <AvatarSkeleton />

            <TextSkeleton styles="w-24 h-2" />

            <TextSkeleton styles="w-32 h-3" />
        </div>
    )
}