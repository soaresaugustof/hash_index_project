import React from "react";

const Dashboard = ({results, index}) => {
    return (
        <div>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;