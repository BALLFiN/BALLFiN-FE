import { useState } from 'react';

export interface Stock {
  id: string;
  code: string;
  name: string;
  price: number;
  change: number;
  isFavorite: boolean;
}

export function useChart() {
  const initialStocks: Stock[] = [
    { id: '1', code: '005930', name: '삼성전자', price: 59100, change: 2.25, isFavorite: true },
    { id: '2', code: '000660', name: 'SKT', price: 88800, change: -0.75, isFavorite: false },
    { id: '3', code: '005931', name: '삼성', price: 59100, change: 0.25, isFavorite: true },
    { id: '4', code: '000661', name: 'SK하이닉스', price: 88800, change: -9.75, isFavorite: false },
    { id: '5', code: '005932', name: '삼성화재', price: 59100, change: 1.25, isFavorite: true },
    { id: '6', code: '000662', name: 'KT', price: 88800, change: -5.75, isFavorite: false },
    { id: '7', code: '005933', name: '삼성bio', price: 59100, change: 4.25, isFavorite: true },
    { id: '8', code: '000663', name: 'T1', price: 88800, change: 3.75, isFavorite: false },
    { id: '9', code: '005934', name: '삼성물류', price: 59100, change: 7.25, isFavorite: true },
    { id: '10', code: '000665', name: '한화', price: 88800, change: -1.75, isFavorite: false },
    { id: '11', code: '005935', name: '삼성생명', price: 59100, change: 0.25, isFavorite: true },
    { id: '12', code: '000666', name: '농심', price: 88800, change: 0.75, isFavorite: false },
  ];

  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const selectAll = (checked: boolean) => {
    setSelectedIds(checked ? stocks.map((s) => s.id) : []);
  };

  const toggleFavorite = (id: string) => {
    setStocks((prev) => prev.map((s) => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s)));
  };

  const deleteSelected = () => {
    setStocks((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
    setSelectedIds([]);
  };

  const addStock = (codeOrName: string) => {
    const newStock: Stock = {
      id: Date.now().toString(),
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      name: codeOrName,
      price: Math.floor(50000 + Math.random() * 50000),
      change: parseFloat((Math.random() * 4 - 2).toFixed(2)),
      isFavorite: false,
    };
    setStocks((prev) => [newStock, ...prev]);
  };

  /** 선택된 종목 순서 변경 */
  const reorder = (action: 'top' | 'up' | 'down' | 'bottom') => {
    setStocks((prev) => {
      let list = [...prev];
      selectedIds.forEach((id) => {
        const idx = list.findIndex((s) => s.id === id);
        if (idx < 0) return;
        const [item] = list.splice(idx, 1);
        let newIndex = idx;
        if (action === 'top') newIndex = 0;
        else if (action === 'bottom') newIndex = list.length;
        else if (action === 'up') newIndex = Math.max(0, idx - 1);
        else if (action === 'down') newIndex = Math.min(list.length, idx + 1);
        list.splice(newIndex, 0, item);
      });
      return list;
    });
  };

  return {
    stocks,
    selectedIds,
    onAdd: addStock,
    onSelect: selectOne,
    onSelectAll: selectAll,
    onToggleFav: toggleFavorite,
    onReorder: reorder,
    onDelete: deleteSelected,
  };
}
