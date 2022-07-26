import { Controller, Get, Put, UseGuards, Req, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BookmarkService } from './bookmark.service';

@ApiTags('/bookmark')
@Controller('bookmark')
export class BookmarkController{
    constructor(private bookmarkService : BookmarkService){}

    @UseGuards(JwtAuthGuard)
    @Get('learning')
    getAllLearningBookmark(@Req() req){
        return this.bookmarkService.getAllLearningBookmark(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('add-learning/:id')
    addLearningBookmarkById(@Req() req, @Param('id') id:number){
        return this.bookmarkService.addLearningBookmarkById(req.user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('remove-learning/:id')
    deleteLearningBookmarkById(@Req() req, @Param('id') id:number){
        return this.bookmarkService.deleteLearningBookmarkById(req.user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('complete')
    getAllCompleteBookmark(@Req() req){
        return this.bookmarkService.getAllCompleteBookmark(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('add-complete/:id')
    addCompleteBookmarkById(@Req() req, @Param('id') id:number){
        return this.bookmarkService.addCompleteBookmarkById(req.user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('remove-complete/:id')
    deleteCompleteBookmarkById(@Req() req, @Param('id') id:number){
        return this.bookmarkService.deleteCompleteBookmarkById(req.user, id);
    }
}
