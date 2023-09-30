function TailWindTabs1() {
    return (<ul className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
        <li className="mr-2">
            <a href="#1" aria-current="page" className="inline-block bg-gray-100 text-blue-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center active dark:bg-gray-800 dark:text-blue-500">Profile</a>
        </li>
        <li className="mr-2">
            <a href="#1" className="inline-block text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-t-lg py-4 px-4 text-sm font-medium text-center dark:text-gray-400  dark:hover:bg-gray-800 dark:hover:text-gray-300">Dashboard</a>
        </li>
        <li className="mr-2">
            <a href="#1" className="inline-block text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-t-lg py-4 px-4 text-sm font-medium text-center dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300">Settings</a>
        </li>
        <li className="mr-2">
            <a href="#1" className="inline-block text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-t-lg py-4 px-4 text-sm font-medium text-center dark:text-gray-400  dark:hover:bg-gray-800 dark:hover:text-gray-300">Contacts</a>
        </li>
        <li>
            <a href="#1" className="inline-block text-gray-400 rounded-t-lg py-4 px-4 text-sm font-medium text-center dark:text-gray-500 cursor-not-allowed">Disabled</a>
        </li>
    </ul>)
}
export { TailWindTabs1 }