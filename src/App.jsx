import './App.css'
import {snacks} from './db/snacks.js'
import {useEffect, useState} from "react";

function App() {
    const [searchInput, setSearchInput] = useState('')
    const [sortedColumn, setSortedColumn] = useState("");
    const [sortedOrder, setSortedOrder] = useState("");
    const [filteredSnacks, setFilteredSnacks] = useState(snacks);


    useEffect(() => {
        const filtered = snacks.filter(
            (snack) =>
                snack.product_name.toUpperCase().includes(searchInput.toUpperCase()) ||
                snack.ingredients
                    .join(" ")
                    .toUpperCase()
                    .includes(searchInput.toUpperCase())
        );
        setFilteredSnacks(filtered);
    }, [searchInput]);

    const handleSort = (column) => {
        if (column === sortedColumn) {
            // Reverse the sorting order
            setSortedOrder(sortedOrder === "asc" ? "desc" : "asc");
        } else {
            // Set the sorting column and order
            setSortedColumn(column);
            setSortedOrder("asc");
        }
    };

    useEffect(() => {
        if (sortedColumn) {
            const sorted = [...filteredSnacks].sort((a, b) => {
                const aValue = a[sortedColumn];
                const bValue = b[sortedColumn];

                if (aValue < bValue) {
                    return sortedOrder === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortedOrder === "asc" ? 1 : -1;
                }
                return 0;
            });

            setFilteredSnacks(sorted);
        }
    }, [sortedColumn, sortedOrder]);


    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <>
            <div className={'app-main p-4'}>
                <h1 className={'text-3xl font-bold'}>Snack Table</h1>
                <div className="input">
                    <input type="search" name="search" id="search" placeholder={'Search with products or ingredients..'}
                           className={'border border-black my-6 p-3 w-96 outline-0'} onChange={handleInputChange}
                           autoComplete={'off'}
                    />
                </div>
                <table className={'border border-black'}>
                    <thead>
                    <tr className={'border border-black bg-blue-200'}>
                        <th className={'px-8 py-4 border border-black cursor-pointer select-none'}
                            onClick={() => handleSort('id')}>ID
                        </th>
                        <th className={'px-8 py-4 border border-black cursor-pointer select-none'}
                            onClick={() => handleSort('product_name')}>Product Name
                        </th>
                        <th className={'px-8 py-4 border border-black cursor-pointer select-none'}
                            onClick={() => handleSort('product_weight')}>Product Weight
                        </th>
                        <th className={'px-8 py-4 border border-black cursor-pointer select-none'}
                            onClick={() => handleSort('price')}>Price(INR)
                        </th>
                        <th className={'px-8 py-4 border border-black cursor-pointer select-none'}
                            onClick={() => handleSort('calories')}>Calories
                        </th>
                        <th className={'px-8 py-4 border border-black cursor-pointer select-none'}
                            onClick={() => handleSort('ingredients')}>Ingredients
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        filteredSnacks.length ?
                            filteredSnacks.map(({id, product_name, product_weight, price, calories, ingredients}) => (
                                <tr key={id} className={'border border-black bg-blue-50'}>
                                    <td className={'px-6 py-2 border border-black'}>{id}</td>
                                    <td className={'px-6 py-2 border border-black'}>{product_name}</td>
                                    <td className={'px-6 py-2 border border-black'}>{product_weight}</td>
                                    <td className={'px-6 py-2 border border-black'}>{price}</td>
                                    <td className={'px-6 py-2 border border-black'}>{calories}</td>
                                    <td className={'px-6 py-2 border border-black'}>
                                        {
                                            ingredients.map(ingredient => (
                                                <span key={ingredient} className={'mr-1'}>
                                                {ingredient},
                                            </span>
                                            ))
                                        }
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={6} className={'text-center py-2'}>Nothing Found</td>
                            </tr>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App
