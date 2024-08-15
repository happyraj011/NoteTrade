"use client";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export default function DashBoard() {
  return (
    <div className="sidebar-container dark:bg-slate-800">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse
              icon={HiShoppingBag}
              label="Add Product"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
              }}
            >
              <Sidebar.Item href="/addBook">Add Book</Sidebar.Item>
              <Sidebar.Item href="/addNotes">Add Notes</Sidebar.Item>
              
            </Sidebar.Collapse>
            <Sidebar.Collapse
              icon={HiShoppingBag}
              label="Own Product"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
              }}
            >
              <Sidebar.Item href="/ownBook">Own Book</Sidebar.Item>
              <Sidebar.Item href="/ownNotes">Own Notes</Sidebar.Item>
              
            </Sidebar.Collapse>
           
           
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              View Cart
            </Sidebar.Item>
            
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
