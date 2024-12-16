



export default function LayoutAuth({children}){

    return(
        <>
            <div className="w-full h-screen flex items-center justify-center  ">
                <div className="relative">
                    <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
                    <div  className="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}