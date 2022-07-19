import { Controller, Get, Put, UseGuards, Req, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BookmarkService } from './bookmark.service';

@ApiTags('/bookmark')
@Controller('bookmark')
export class BookmarkController{
    constructor(private bookmarkService : BookmarkService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllBookmark(@Req() req){
        return this.bookmarkService.getAllBookmark(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('add/:id')
    addBookmarkById(@Req() req, @Param('id') id:number){
        return this.bookmarkService.addBookmarkById(req.user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('remove/:id')
    deleteBookmarkById(@Req() req, @Param('id') id:number){
        return this.bookmarkService.deleteBookmarkById(req.user, id);
    }
}
