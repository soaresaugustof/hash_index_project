import React from "react";

const Dashboard = ({resultados}) => {
    return (
        <div>
            <ul>
            {resultados && resultados.length > 0 && (
                <ul>
                    {resultados.map((resultado, index) => (
                    <li key={index}>{resultado}</li>
                    ))}
                </ul>
            )}
            </ul>
        </div>
    );
};

export default Dashboard;