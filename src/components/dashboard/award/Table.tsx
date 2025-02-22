"use client";

import { AwardType, Clan } from "../../../types/types";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import {
    Table, TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";

import { useState } from "react";
import bronze from "../../../assets/rankAndTrophies/bronze.png";
import elite from "../../../assets/rankAndTrophies/elite.png";
import gold from "../../../assets/rankAndTrophies/gold.png";
import silver from "../../../assets/rankAndTrophies/sliver.png";
import { MainModal } from "../../Modal/MainModal";

import comeback from "@/assets/award/comeback.png";
import mvp from "@/assets/award/mvp.png";
import strategy from "@/assets/award/strategy.png";
import teamwork from "@/assets/award/teamwork.png";
import { AnimatedTooltip } from "../../ui/animated-tooltip";

export function AwardTable({ clans }: { clans: Clan[] }) {

    const [awardModal, setAwardModal] = useState(false);
    const [modalData, setModalData] = useState<null | Clan>(null)
    const award: AwardType[] = ["mvp", "strategy", "comeback", "teamwork"]

    const giveAward = (tag: AwardType) => {
        console.log(tag);
    }


    const getTrophyIcon = (type: string) => {
        switch (type) {
            case "Bronze":
                return bronze;
            case "Silver":
                return silver;
            case "Gold":
                return gold;
            case "Elite":
                return elite;
            default:
                return bronze;
        }
    };

    const getAwardIcon = (award: string) => {
        switch (award) {
            case "mvp":
                return mvp;
            case "strategy":
                return strategy;
            case "comeback":
                return comeback;
            case "teamwork":
                return teamwork;
            default:
                return mvp;
        }
    };

    return (
        <div className="rounded-lg bg-fourthColor p-4">
            <p className="font-semibold text-2xl uppercase">Give Award</p>
            <ScrollArea>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="px-14 lg:px-4 py-5 text-sm text-primary_highlighted text-nowrap lg:text-base">
                                Clan
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                ID
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                Total Members
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                Tournaments Played
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                Trophies
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                Lost/Win
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                Awards
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clans.map((clan, idx) => (
                            <TableRow key={idx} className="hover:bg-black/20 text-sm md:text-base">
                                <TableCell className="font-medium text-nowrap py-6">
                                    {clan.name}
                                </TableCell>
                                <TableCell className="font-medium text-nowrap py-6">
                                    {clan.id}
                                </TableCell>
                                <TableCell>
                                    {clan.totalMembers}
                                </TableCell>
                                <TableCell>
                                    <span className="text-secondary_highlighted">{clan.tournamentsPlayed}</span>
                                </TableCell>
                                <TableCell className="">
                                    <div className="grid grid-cols-4 min-w-[300px]">
                                        {clan.trophies.map((trophy, i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <img src={getTrophyIcon(trophy.type)} alt={trophy.type} className="w-5 h-5" />
                                                <span className="text-xs text-nowrap">{trophy.type}: {trophy.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-red-600 font-bold">{clan.lostWin.lost}</span> / <span className="text-green-600 font-bold">{clan.lostWin.win}</span>
                                </TableCell>
                                <TableCell className="grid grid-cols-2 items-center justify-center">
                                    {clan.awards.map((award, idx) => (
                                        <div key={idx} className="">
                                            <AnimatedTooltip key={idx} classProps="rounded-full aspect-square object-contain h-7 w-7" id={idx} image={getAwardIcon(award)} tooltip={award.toUpperCase()} />
                                            {/* <span className="text-xs text-nowrap">{award}</span> */}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <button onClick={() => {
                                        setAwardModal(true)
                                        setModalData(clan)
                                    }} className="px-3 py-1 text-white bg-blue-500 rounded-md">
                                        Award
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <MainModal isOpen={awardModal} onClose={() => setAwardModal(false)}>
                <div>
                    {
                        modalData && <div>
                            <h2 className="my-2 text-lg">Awards for Clan: {modalData.name}</h2>
                            <div className="flex  gap-4">
                                {/* Display the awards already given */}
                                {modalData.awards.length > 0 ? (
                                    modalData.awards.map((award, index) => (
                                        <div key={index} className="flex items-center gap-2 border py-2 px-4 rounded-lg">
                                            <img src={getAwardIcon(award)} alt={award} className="w-10 h-10 object-contain" />
                                            <span className="uppercase">{award}</span>
                                        </div>
                                    ))
                                ) : (
                                    <span>No awards given yet.</span>
                                )}
                            </div>
                            <div>
                                <h2 className="my-2 text-lg">Give Award</h2>
                                <div className="flex gap-4">
                                    {modalData && modalData.awards && (
                                        award.filter((i) => !modalData.awards.includes(i)).map((award, index) => (
                                            <div key={index} className="flex items-center gap-2 border py-2 px-4 rounded-lg cursor-pointer hover:border-primary_highlighted hover:text-primary_highlighted transition"
                                                onClick={() => giveAward(award)}
                                            >
                                                <img src={getAwardIcon(award)} alt={award} className="w-10 h-10 object-contain" />
                                                <span className="uppercase">{award}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>


                        </div>
                    }
                </div>
            </MainModal>
        </div>
    );
}
