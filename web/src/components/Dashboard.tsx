// // import React from 'react';
// import { Button } from "@/components/ui/button"
// import { Table, TableCaption,TableHeader,TableRow,TableHead,TableBody,TableCell } from "@/components/ui/table"
// import '../styles/index.css';
//
// function Dashboard() {
//     return (
//             <div>
//                 <h2>vkdvk</h2>
//                 <Button >Click me</Button>
//                 <Button variant="secondary">Secondary</Button>
//                 <Table className="myTable">
//                     <TableCaption>Список задач</TableCaption>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead className="w-[100px]">Invoice</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Method</TableHead>
//                             <TableHead className="text-right">Amount</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         <TableRow>
//                             <TableCell className="font-medium">INV001</TableCell>
//                             <TableCell>Paid</TableCell>
//                             <TableCell>Credit Card</TableCell>
//                             <TableCell className="text-right">$250.00</TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </div>
//
//     )
// }
//
// export default Dashboard;

// import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskPage from "@/components/page.tsx";

// import {Button} from "@/components/ui/button.tsx";


function Dashboard() {
    return (
        <div>
            <TaskList>Список задач</TaskList>
            <TaskPage></TaskPage>
        </div>
    );
}

export default Dashboard;
