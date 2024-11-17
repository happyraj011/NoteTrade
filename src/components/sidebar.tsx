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
    <div className="sidebar-container dark:bg-slate-800 bg-white">
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className="w-60">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {/* Dashboard Item */}
            <Sidebar.Item href="/" icon={HiChartPie} className="text-gray-800 dark:text-white">
              Dashboard
            </Sidebar.Item>

            {/* Add Product Collapse */}
            <Sidebar.Collapse
              icon={HiShoppingBag}
              label="Add Product"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                return (
                  <IconComponent
                    aria-hidden
                    className={twMerge(theme.label.icon.open[open ? "on" : "off"], "text-gray-800 dark:text-white")}
                  />
                );
              }}
            >
              <Sidebar.Item href="/addBook" className="text-gray-800 dark:text-white">
                Add Book
              </Sidebar.Item>
              <Sidebar.Item href="/addNotes" className="text-gray-800 dark:text-white">
                Add Notes
              </Sidebar.Item>
            </Sidebar.Collapse>

            {/* Own Product Collapse */}
            <Sidebar.Collapse
              icon={HiShoppingBag}
              label="Own Product"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                return (
                  <IconComponent
                    aria-hidden
                    className={twMerge(theme.label.icon.open[open ? "on" : "off"], "text-gray-800 dark:text-white")}
                  />
                );
              }}
            >
              <Sidebar.Item href="/ownBook" className="text-gray-800 dark:text-white">
                Own Book
              </Sidebar.Item>
              <Sidebar.Item href="/ownNotes" className="text-gray-800 dark:text-white">
                Own Notes
              </Sidebar.Item>
            </Sidebar.Collapse>

            {/* View Cart Item */}
            <Sidebar.Item href="/addToCart" icon={HiShoppingBag} className="text-gray-800 dark:text-white">
              View Cart
            </Sidebar.Item>

            {/* Profile Section */}
            <Sidebar.Item href="/profile" icon={HiUser} className="text-gray-800 dark:text-white">
              Profile
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
