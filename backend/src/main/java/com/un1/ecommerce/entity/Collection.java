package com.un1.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "collections")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(name = "cover_url")
    private String coverUrl;

    @ElementCollection
    @CollectionTable(name = "collection_images", joinColumns = @JoinColumn(name = "collection_id"))
    @Column(name = "image_url", length = 1000)
    private List<String> galleryUrls;

    @Column(name = "is_active")
    private boolean active = true;
}
