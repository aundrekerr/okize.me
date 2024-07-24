import React, { useRef, useEffect, useState, useMemo, CSSProperties } from 'react';
import { Column, ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable, } from '@tanstack/react-table'
import { motion } from 'framer-motion';

import slugify from "@/app/utils/slugify";
import config from "@/app/street-fighter-6/config"
import type { Move } from "@/app/street-fighter-6/[character]/MoveItem";
import moveAdvantageDisplay from "@/app/utils/moveAdvantageDisplay";
import moveCancelsDisplay from "@/app/utils/moveCancelsDisplay";
import NotationImages from "@/app/street-fighter-6/NotationImages";
import "@/app/street-fighter-6/[character]/styles/table.css"

type Props = {
  character: string,
  movelist: Move[],
  activeMove: Move | null,
  setActiveMove: Function,
  activeInstall: string,
}

export default function CharacterTable({ character, movelist, activeMove, setActiveMove, activeInstall }: Props)  {
  const sf6Config = config() as any;
  const movelistCharacter = sf6Config[character];
  const categories = movelistCharacter["categories"][activeInstall];
  const tableRef = useRef<HTMLDivElement>(null);

  const isCharge = (move: Move) => {
    return Object.hasOwn(move, 'chargeDirection') 
      && ["special", "super"].includes(move.moveType) 
      && !["QCF", "QCF", "HCF", "HCB", "DP", "DQCF"].includes(move.moveMotion)
  }
  // categories.map((cat: any, cIndex: number) => {
  //   if (cIndex + 1 === categories.length) return;

  //   for (const [key, value] of Object.entries(cat)) {
  //     return movelist.map((move: Move, mIndex: number) => {
  //       if ((value as number) === mIndex) return (
  //         <Fragment key={cIndex}>
  //           <h6 className="category-title">{key}</h6>
  //           {
  //             movelist.map((m: Move, i: number) => {
  //               const nextCat = categories[cIndex + 1];
  //               if (!nextCat) return;
  //               const nextCatIndex = (Object.values(nextCat)[0] as number); 
  //               if (i >= (value as number) && i < nextCatIndex) {
  //                 return <li 
  //                   key={`moveItem-${i}`} 
  //                   onClick={() => setActiveMove(m)} 
  //                   className={m.moveName === activeMove?.moveName ? "selected" : ""}
  //                   id={slugify(m.moveName)}
  //                 >
  //                   <MoveItem move={m} />
  //                 </li>
  //               }
  //             })
  //           }
  //         </Fragment>
  //       )
  //     })
  //   }

  // })

  const [data, setData] = useState(movelist);
  const columnHelper = createColumnHelper<Move>()
  const columns = [
    columnHelper.accessor('moveName', {
      cell: ({ cell, row }) => {
        return (
          <div className='flex flex-col items-start'>
            <span className="name">{row.original.moveName}</span>
            <NotationImages 
              notationString={row.original.numCmd} 
              isCharge={isCharge(row.original)} 
              imageSize={14}
            />
          </div>
        )
      },
      header: 'Name' ,
      size: 140
    }),
    columnHelper.accessor('startup', {
      cell: info => info.getValue(), 
     header: 'Startup' ,
     size: 140
  }),
    columnHelper.accessor('active', {
      cell: info => info.getValue(), 
      header: 'Active' ,
      size: 140
    }),
    columnHelper.accessor('recovery', {
      cell: info => info.getValue(), 
      header: 'Recovery' ,
      size: 140
    }),
    columnHelper.accessor('onHit', {
      cell: info => info.getValue(), 
      header: 'On Hit' ,
      size: 140
    }),
    columnHelper.accessor('onBlock', {
      cell: info => info.getValue(), 
      header: 'On Block' ,
      size: 140
    }),
    columnHelper.accessor('onPC', {
      cell: info => info.getValue(), 
      header: 'On Punish' ,
      size: 140
    }),
    columnHelper.accessor('total', {
      cell: info => info.getValue(), 
      header: 'Total' ,
      size: 140
    }),
    columnHelper.accessor('hitstun', {
      cell: info => info.getValue(), 
      header: 'Hitstun' ,
      size: 140
    }),
    columnHelper.accessor('blockstun', {
      cell: info => info.getValue(), 
      header: 'Blockstun' ,
      size: 140
    }),
    columnHelper.accessor('xx', {
      cell: info => info.getValue(), 
      header: 'Cancels' ,
      size: 140
    }),
    columnHelper.accessor('dmg', {
      cell: info => info.getValue(), 
      header: 'Damage' ,
      size: 140
    }),
    columnHelper.accessor('atkLvl', {
      cell: info => info.getValue(), 
      header: 'Attack Level' ,
      size: 140
    }),
    columnHelper.accessor('DRoH', {
      cell: info => info.getValue(), 
      header: 'DR On Hit' ,
      size: 140
    }),
    columnHelper.accessor('DRoB', {
      cell: info => info.getValue(), 
      header: 'DR On Block' ,
      size: 140
    }),
    columnHelper.accessor('onPP', {
      cell: info => info.getValue(), 
      header: 'On P. Parry' ,
      size: 140
    }),
    columnHelper.accessor('chp', {
      cell: info => info.getValue(), 
      header: 'Chip' ,
      size: 140
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isDown, setIsDown] = useState(false);
                  
  const mouseIsDown = (e:any) => {
    if (!tableRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - tableRef.current.offsetLeft);
    setStartY(e.pageY - tableRef.current.offsetTop);
    setScrollLeft(tableRef.current.scrollLeft);
    setScrollTop(tableRef.current.scrollTop);
  }
  const mouseUp = (e:any) => {
    setIsDown(false);
  }
  const mouseLeave = (e:any) => {
    setIsDown(false);
  }
  const mouseMove = (e:any) => {
    if (!tableRef.current) return;
    if(isDown){
      e.preventDefault();

      //Move Horizontally
      const x = e.pageX - tableRef.current.offsetLeft;
      const walkX = x - startX;
      const y = e.pageY - tableRef.current.offsetTop;
      const walkY = y - startY;
      tableRef.current.scrollLeft = scrollLeft - walkX;
      tableRef.current.scrollTop = scrollTop - walkY;
    }
  }

  return (
    <>
      <motion.div 
        ref={tableRef} 
        className="character-moves-table-view container"
        onMouseDown={mouseIsDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        onMouseLeave={mouseLeave}
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.3 }}
      >
          <table style={{ width: table.getLeftTotalSize() }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr key={row.id} onClick={() => setActiveMove(row.original)}>
                  {/* <>{console.log(index)}</> */}
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
      </motion.div>
    </>
  )
}