export const SignInButton = ({ label , className, onClick}: { className:string, label: string, onClick:React.MouseEventHandler<HTMLButtonElement> }) => {
    return <div>
        <button className={` ${className} bg-[#ec4899] font-semibold text-xs text-white items-center px-10 rounded-xl py-1 mt-4`} onClick={onClick}>{label}</button>
    </div>
}