

function FailureView() {

    return (
        <div className="flex flex-col items-center justify-center">
            <img
                className="w-[80%] max-w-[400px]"
                src="https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg" alt="Error" />
            <p className="mb-4 font-bold text-blue-600 text-2xl">Something went Wrong!</p>
        </div>
    )
}

export default FailureView