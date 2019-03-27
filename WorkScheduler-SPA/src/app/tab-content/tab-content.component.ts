import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../_models/Photo';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { DownloadablePhoto } from '../_models/DownloadablePhoto';
import { Job } from '../_models/Job';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements OnInit {
  @Input() photos: Photo[];
  @Input() job: Job;
  downloadablePhotos: DownloadablePhoto[] = [];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  photoLength: number;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.isMobile();
    this.makeDownloadable();

    this.galleryOptions = [
      {
        width: '378px',
        height: '278px',
        preview: false,
        imagePercent: 100,
        imageArrowsAutoHide: false,
        imageSwipe: true,
        thumbnails: false,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsAutoHide: true
      }
    ];

    this.galleryImages = this.getImages();
  }

  makeDownloadable() {
    this.photos.forEach(element => {
      this.downloadablePhotos.push({
        url: element.url,
        link: this.addAttach(element.url)
      });
    });
    this.photoLength = this.downloadablePhotos.length;
  }

  getImages() {
    const imageUrls = [];

    this.photos.forEach(element => {
      imageUrls.push({
        small: element.url,
        medium: element.url,
        big: element.url
      });
    });

    return imageUrls;
  }

  isPhotos(): boolean {
    if (this.photos.length > 0) {
      if (this.photoLength < this.photos.length) {
        this.downloadablePhotos = [];
        this.makeDownloadable();
        this.galleryImages = [];
        this. galleryImages = this.getImages();
      }
      return true;
    } else {
      return false;
    }
  }

  isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 600px)');
  }

  addAttach(url: string): string {
    const splitted = url.split('upload');
    const downloadUrl = splitted[0] + 'upload/fl_attachment' + splitted[1];

    return downloadUrl;
  }
}
