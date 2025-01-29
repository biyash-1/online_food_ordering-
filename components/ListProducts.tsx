import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  reviewCount: string;
  mealType: string;
}

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        console.log(data.recipes);
        setProducts(data.recipes);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number): void => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">All products</h1>
      <div className="mx-auto p-4 mt-2">
        <Table className="mx-auto pt-4">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="">Meal type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.reviewCount}</TableCell>
                <TableCell>{product.mealType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination className="mt-4 flex justify-center">
  <PaginationContent>
    {/* Previous Button */}
    <PaginationItem>
      <PaginationPrevious
        onClick={() => handlePageChange(currentPage - 1)}
        className={
          currentPage === 1 ? "pointer-events-none opacity-50" : undefined
        }
      />
    </PaginationItem>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
      <PaginationItem key={page}>
        <PaginationLink
          isActive={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ))}

    {/* Next Button */}
    <PaginationItem>
      <PaginationNext
        onClick={() => handlePageChange(currentPage + 1)}
        className={
          currentPage === totalPages
            ? "pointer-events-none opacity-50"
            : undefined
        }
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
      </div>
    </div>
  );
};

export default ListProducts;
